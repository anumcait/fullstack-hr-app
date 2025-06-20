const { LeaveApplication, LeaveDetails } = require('../models');

const { Sequelize } = require('sequelize');


exports.applyLeave = async (req, res) => {
  const { application, leaveDetails } = req.body;
  const t = await LeaveApplication.sequelize.transaction();

  try {
    // 1. Get MAX(lno) + 1 manually
    const maxLnoResult = await LeaveApplication.findOne({
      attributes: [
        [Sequelize.fn('COALESCE', Sequelize.fn('MAX', Sequelize.col('lno')), 0), 'maxLno']
      ],
      transaction: t,
      lock: t.LOCK.UPDATE // ensure row-level lock during transaction
    });

    const nextLno = maxLnoResult.get('maxLno') + 1;

    // 2. Set lno manually in the application object
    application.lno = nextLno;

    // 3. Insert master record
    const newApp = await LeaveApplication.create(application, { transaction: t });

    // 4. Insert detail rows with the same lno
    const detailsWithLno = leaveDetails.map(d => ({ ...d, lno: nextLno }));
    await LeaveDetails.bulkCreate(detailsWithLno, { transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Leave application submitted successfully.', lno: nextLno });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Failed to submit leave application.', error });
  }
};

// Get next available leave application number
exports.getNextLeaveNumber = async (req, res) => {
  try {
    const maxLno = await LeaveApplication.max('lno');
    const nextLno = (maxLno || 0) + 1;

    res.json({ nextLno });  // Sends the response correctly

  } catch (error) {
    console.error('Failed to fetch next leave number:', error);
    res.status(500).json({ message: 'Failed to get next leave application number.' });
  }
};
exports.getAllLeaves = async (req, res) => {
  try {
    const data = await LeaveApplication.findAll({
      include: [{
        model: LeaveDetails,
        as: 'leaveDetails',
        required: true
      }],
      order: [['lno', 'DESC']]
    });

     res.json(data);
   } catch (error) {
     console.error('❌ Error fetching leaves:', error);
     res.status(500).json({ message: 'Failed to fetch leave data.', error });
   }
 };
