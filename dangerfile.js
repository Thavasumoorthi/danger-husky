import { danger, fail } from 'danger';


//step 1: checking any consolelog is present in the file
const newOrModifiedFiles = [
    ...danger.git.modified_files,
    ...danger.git.created_files,
];

newOrModifiedFiles.forEach(file => {
    if ((file.endsWith(".js") || file.endsWith(".ts")) && file !== "dangerfile.js") {
        const fs = require('fs');
        const fileContent = fs.readFileSync(file, 'utf-8');
        if (fileContent.includes("console.log")) {
            fail(`❌ Remove console.log from ${file} before committing.`);
        }
    }
});


//step 2: check any environment file changing or not
const sensitive_file=["secrets.env"]
sensitive_file.forEach((file)=>{
    if(newOrModifiedFiles.includes(file)){
        fail("❌ Secrets File are changed,please verify before commiting")
    }

})


