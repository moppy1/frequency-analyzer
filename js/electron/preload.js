// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// Filesystem Module
const fs = require("fs");
// Dialog Module
const {dialog} = require("electron").remote;

window.addEventListener('DOMContentLoaded', () => 
{
  //............................................................................
  //File Operations

  //--------------------
  // Read File
  //--------------------
  let readFile = (filepath) =>
  {
    fs.readFile(filepath, 'utf-8', (err, data) =>
    {
      if (err) 
      {
        alert("An error ocurred reading the file :" + err.message);
        return;
      }
      storageFile.saveLastFile(filepath);
      let filepathSplit = filepath.split('\\');
      let fileName = filepathSplit[filepathSplit.length-1];
      fileHandlerMain.processMainData(data, false, fileName);
    });
  }
  //--------------
  // Write File
  //--------------
  let saveChanges = (filepath, content) => 
  {
    fs.writeFile(filepath, content, (err) => 
    {
      if (err) 
      {
        alert("An error ocurred updating the file" + err.message);
        console.log(err);
        return;
      }
      //alert("The file has been succesfully saved");
    });
  }
  //--------------
  // Delete File
  //--------------
  let deleteFile = (filepath) =>
  {
    fs.exists(filepath, function (exists) 
    {
      if (exists) {
        // File exists deletings
        fs.unlink(filepath, function (err) 
        {
          if (err) 
          {
            alert("An error ocurred updating the file" + err.message);
            console.log(err);
            return;
          }
        });
      } 
      else 
      {
        alert("This file doesn't exist, cannot delete");
      }
    });
  }

  //............................................................................
  //Funtionality

  //--------------------
  //Load last file
  //--------------------
  let loadLastFile = () =>
  {
    var lastFilePath = localStorage.getItem('planungstool_lastFile');
    var lastMode = localStorage.getItem('planungstool_mode');
    if (lastMode == 'edit' && lastFilePath && lastFilePath != '') 
    {
      readFile(lastFilePath)
    }
  }
  loadLastFile();
  //--------------------
  // Load File
  //--------------------
 // openFile', 'multiSelections'
  document.getElementById('fileImportDataTriggerStart').addEventListener('click', () =>
  {
    dialog.showOpenDialog({
      properties: ['openFile']
    }).then(result => {
      readFile(result.filePaths[0]);
    }).catch(err => {
      console.log(err)
    })
  });
  //--------------------
  // Save File
  //--------------------
  document.getElementById('fileSaveTrigger').addEventListener('click',() =>
  {
    var actualFilePath = localStorage.getItem('planungstool_lastFile');
    if(actualFilePath)
    {
      saveChanges(actualFilePath,view.getDataExport());
    }
    else
    {
      view.exportMainData(document.getElementById('fileSaveTrigger'));
    }
  },false);
  //-------------------
  //New File
  //-------------------
  document.getElementById('create-new-file').addEventListener('click',(e)=>
  {
    dialog.showSaveDialog({
    }).then(result => {

      let filepath = result.filePath;
      if(filepath == undefined || filepath == '')
        return
      saveChanges(filepath,view.getDataExport());
      view.newFile(filepath);
    }).catch(err => {
      console.log(err)
    })
  },false);

  // document.getElementById('delete-file').addEventListener('click',function(){
  //     var actualFilePath = document.getElementById("actual-file").value;

  //     if(actualFilePath){
  //         deleteFile(actualFilePath);
  //         document.getElementById("actual-file").value = "";
  //         document.getElementById("content-editor").value = "";
  //     }else{
  //         alert("Please select a file first");
  //     }
  // },false);
})