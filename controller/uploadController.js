exports.uploadFile = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      status: "fail",
      msg: "No file uploaded",
    })
  }

  const file = req.files.file
  file.mv(`${__dirname}/../public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    } else {
      res.json({
        fileName: file.name,
        filePath: `http://www.barracudadev.com/uploads/${file.name}`,
      })
    }
  })
}
