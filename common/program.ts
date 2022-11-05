import { BehaviorSubject } from "rxjs"
import { ServiceWorker } from "./worker"

export class Program {
  tasks: (string | number)[] = []
  workersCount: number = 0
  concurrencyLimit: BehaviorSubject<number> = new BehaviorSubject(5)
  totalTasks: number = 0
  constructor(

  ) {
    this.concurrencyLimit.subscribe((x) => this.ConcurrencyUpdate(x))
  }

  /*
  this method is responsible for creating a new worker 
  and assigning the task and increases the worker count
  */
  StartWorker() {
    const worker = new ServiceWorker()
    worker.onComplete((data) => this.onComplete(data, worker))
    console.log(`[EXE] Concurrency: ${this.workersCount} of max ${this.concurrencyLimit.value}`)
    worker.perform(this.tasks.shift())
    this.workersCount++
  }

  /*
  this method is responsible for terminating extra workers 
  and updating workers on completion of tasks and if some 
  tasks are left it tells the worker to perform them 
  */
  onComplete(data: any, worker: ServiceWorker) {
    if (!this.tasks.length || this.workersCount > this.concurrencyLimit.value) {
      console.error("[Worker] teminationg worker ", data)
      worker.terminate()
      this.workersCount--
    } else {
      worker.perform(this.tasks.shift())
    }
    console.log(`[EXE] Concurrency: ${this.workersCount} of max ${this.concurrencyLimit.value}`)
    console.log(`[EXE] Task count  ${this.totalTasks - this.tasks.length} of ${this.totalTasks}`);
  }

  /*
  this method is responsible for updating the max number of workers depending value of concurrency limit
  */
  ConcurrencyUpdate(value: number) {
    console.log(`[Info] **** changing concurrency to ${value} **** `)

    if (this.workersCount < value) {
      const maxNewWorkers = Math.min(value - this.workersCount, this.tasks.length)
      for (let index = 0; index < maxNewWorkers; index++) this.StartWorker()
    }
  }

  /*
  this method is responsible for setting up and start the execution  
  assigns tasks, maxNewWorkers and changes concurrency during runtime!
  */
  Start(tasks: (string | number)[], counter: number) {
    this.tasks = tasks
    this.totalTasks = counter;

    console.log("[init] Concurrency Algo Testing...")
    console.log("[init] Tasks to process: ", this.tasks.length)
    console.log("[init] Task list: " + this.tasks)
    console.log("[init] Maximum Concurrency: ", this.concurrencyLimit.value, "\n")

    const maxNewWorkers = Math.min(this.concurrencyLimit.value, this.tasks.length)
    for (let index = 0; index < maxNewWorkers; index++) this.StartWorker()

    setTimeout(() => this.concurrencyLimit.next(25), 5000)
    setTimeout(() => this.concurrencyLimit.next(4), 10000)
    setTimeout(() => this.concurrencyLimit.next(10), 20000)
  }
}
