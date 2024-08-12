export default async function getStageGirls(req, res){
  try {
    console.log('ddd getStageGirls executed');
    const { db } = req.app;

    const { firstName } = req.params;

    let response;
    if (firstName) {
      response = await db.collection('stage-girls').findOne({ firstName });
    } else {
      response = await db.collection('stage-girls').find().toArray();
    }
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}