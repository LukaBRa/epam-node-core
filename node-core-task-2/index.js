const fs = require("fs");
const os = require("os");
const childProcess = require("child_process");

const getSystemInfo = () => {
    const platform = os.platform();

    if(platform === "linux" || platform === "darwin"){
        const command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
        return childProcess.execSync(command, { encoding: 'utf-8' });
    } else if(platform === "win32"){
        const command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
        return childProcess.execSync(command, { encoding: 'utf-8' });
    } else {
        throw new Error("Operating system is not supported.");
    }
}

const logToFile = (data) => {

    fs.appendFile("activityMonitor.log", `${new Date(Date.now())}: ${data}\n`, (err) => {
        if(err) throw err;
    });

}

const runProgram = () => {

    logToFile("Create log file.");

    setInterval(() => {
        const systemInfo = getSystemInfo();
        console.log(systemInfo);
        if(Math.floor(Date.now() / 1000) % 60 === 0){
            logToFile(getSystemInfo());
        }
        console.clear();
    }, 100);

}

runProgram();