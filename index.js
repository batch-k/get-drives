const child_process = require("child_process");

// Get-PSDrive -PSProvider FileSystem | Select-Object -Property @{name="name";expression="Name"}, @{name="free";expression="Free"}, @{name="displayRoot";expression="DisplayRoot"} | ConvertTo-Json
const getDriveCommand 	= [
	"Get-PSDrive", "-PSProvider", "FileSystem", "|",
	"Select-Object", "-Property", "@{name=\"name\";expression=\"Name\"},", "@{name=\"free\";expression=\"Free\"},", "@{name=\"displayRoot\";expression=\"DisplayRoot\"}", "|",
	"ConvertTo-Json"
];

const encoding 			= "utf8"

/**
 * 
 * @returns {Promise.<{ name: string, free: number, displayRoot: string }[]>}
 */
exports.getDrives = () => {
    const stdouts = [];

    const spawn = child_process.spawn("powershell.exe", getDriveCommand);

    spawn.stdout.setEncoding(encoding);
    spawn.stderr.setEncoding(encoding);

    spawn.stdout.on("data", data => stdouts.push(data));
    spawn.stderr.on("data", data => console.error(data));

    return new Promise((resolve, reject) => {
        spawn.on("close", code => {
            const stdout    = stdouts.join("");
            const _drives 	= JSON.parse(stdout);
			const drives 	= _drives.map(({ name, free, displayRoot }) => { return { name: name + ":", free, displayRoot }; });

            resolve(drives);

			spawn.removeAllListeners("close");
        });
    });
}