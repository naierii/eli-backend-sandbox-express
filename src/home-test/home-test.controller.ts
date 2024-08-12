export async function getHomeTest(req, res){
  try {
    res.status(200).json({test: 'Success!'});
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
