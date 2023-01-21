let fss=require('fs')
let path=require('path')

let folderpath=process.argv[2]
//["pathtonode","pathtofile","input_passed_in_terminal"]

let folderexist=fss.existsSync(folderpath)

let extension={
     
    Audio:['.mp3'],
    Video:['.mp4','.mkv'],
    Document:['.doc','.xlsx','.pdf','.txt'],
    Image:['.jpg','.jpeg','.png','.gif'],
    Software:['.exe']

};

if(folderexist)
{
    let files=fss.readdirSync(folderpath)
    for(let i=0;i<files.length;i++)
    {
        let ext=path.extname(files[i])
        let nameoffolder= givefoldername(ext)
        // console.log("ext--"+ ext + "   type---"+ nameoffolder)

        let pathOfFolder=path.join(folderpath,nameoffolder)
        let exist=fss.existsSync(pathOfFolder)
        if(exist)
        {
        moveFile(folderpath,pathOfFolder,files[i])

        }
        else{
            fss.mkdirSync(pathOfFolder)
            moveFile(folderpath,pathOfFolder,files[i])
        }

    }
}
else{
    console.log("path is invalid...please enter valid path!!!!")
}

function givefoldername(ext)
{
    for(let key in extension)
    {
        let extarr=extension[key]
        for(let i=0;i<extarr.length;i++)
        {
            if(ext==extarr[i])
                {
                    return key;
                }
        }
    }
    return 'other'
}


function moveFile(folderpath,pathOfFolder,filename)
{
    let source=path.join(folderpath,filename)
    let destination=path.join(pathOfFolder,filename)

    fss.copyFileSync(source,destination)
    fss.unlinkSync(source)
}