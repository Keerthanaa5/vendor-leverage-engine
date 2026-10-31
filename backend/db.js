const { execFile } = require("child_process");
const util = require("util");

const execFileAsync = util.promisify(execFile);

async function executeQuery(sql) {
    const { stdout } = await execFileAsync(
        `${process.env.USERPROFILE}\\.local\\bin\\exapump.exe`,
        ["sql", "--profile", "starter-kit", sql],
        { maxBuffer: 10 * 1024 * 1024 }
    );

    return stdout;
}

module.exports = { executeQuery };