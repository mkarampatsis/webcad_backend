import { Request, Response, NextFunction } from 'express';
import * as uploadService from '../services/upload_files.service';

export const getFilesByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email as string;
    
    const result = await uploadService.getFilesByEmail(email.trim());
    if (result.status) 
      return res.status(200).json({ status: result.status, message: result.message, files:result.files });
    else {
      res.status(401).json({ status: result.status, message: result.message, files:result.files})  
    }    
  } catch (err) {
    res.status(400).json({ status: false, message: `Problem in getting files ${err}`, files:[]})
   }
};

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email as string;

    res.json({
      status:true,
      message: "File uploaded successfully",
      email,
      file: req.file
    });
  } catch (err: any) {
    res.status(400).json({ status:false, message:`Problem in uploading file, ${err.message}` });
  }

}