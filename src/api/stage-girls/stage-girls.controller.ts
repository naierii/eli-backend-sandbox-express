export default async function getStageGirls(req, res){
  try {
    console.log('aaa getStageGirls executed');
    const { db } = req.app;
    const { sort, sortBy } = req.query;
    console.log('sordBy', sortBy);

    const { firstName } = req.params;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let response;
    if (firstName) {
      response = await db.collection('stage-girls').findOne({ firstName: capitalizeFirstLetter(firstName) });
    } else {
      response = await db.collection('stage-girls').find().toArray();
    }

    if (sortBy) {
      response = response.sort((a, b) => {
        if (sort === 'desc') {
          return b[sortBy] - a[sortBy];
        } else {
          return a[sortBy] - b[sortBy];
        }
      });
    }

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}