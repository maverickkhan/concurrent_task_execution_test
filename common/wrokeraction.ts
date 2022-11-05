const { parentPort } = require("worker_threads")

const operation = (data) => {
  const begin = Date.now()
  console.warn("[TASK] Starting: " + data)
  new Promise(function (resolve, reject) {
    setTimeout(() => {
      const end = Date.now()
      const timeSpent = end - begin + "ms"
      // console.warn("[TASK] FINISHED: " + data + " in " + timeSpent)
      console.log('\x1b[36m', "[TASK] FINISHED: " + data + " in " +
        timeSpent, '\x1b[0m');
      resolve(true);
      parentPort.postMessage(data)
    }, ~~(Math.random() * 5000))
  })
}

parentPort.on("message", operation)
