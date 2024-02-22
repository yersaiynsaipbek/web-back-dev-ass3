const excelReader = require('../services/excelReaderService')
const fs = require('fs');
const HttpStatus = require('http-status');

exports.readExcelFile = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const uploadedFile = req.files.file;

        const uploadPath = 'resources/uploads/' + uploadedFile.name;

        await uploadedFile.mv(uploadPath, function (err) {
            excelReader.readAll(uploadPath);
        });

        res
            .status(HttpStatus.OK)
            .send('File read successfully')
    } catch (err) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.sendExcelFile = async (req, res) => {
    try {
        const filePath = excelReader.getExcelFile();

        fs.exists(filePath, function (exists) {
            if (exists) {
                res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + "fake_library_data.xlsx"
                });
                fs.createReadStream(filePath).pipe(res);
                return;
            }
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("ERROR File does not exist");
        });
    } catch (err) {
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}