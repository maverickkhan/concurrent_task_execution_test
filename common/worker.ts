import path from "path"
import { Worker } from "node:worker_threads"
type WorkerCompleteFn = (this: Worker, ev: WorkerEventMap["message"]) => any

export class ServiceWorker {
  worker: Worker

  constructor(onPostMessage?: WorkerCompleteFn) {
    this.worker = new Worker(path.resolve("common/wrokeraction.ts"))
    if (onPostMessage) this.onComplete(onPostMessage)
  }

  public perform(task: number | string) {
    this.worker.postMessage(task)
  }

  public onComplete(onPostMessage?: WorkerCompleteFn) {
    this.worker.addListener("message", onPostMessage)
  }

  public terminate() {
    this.worker.terminate()
  }
}
