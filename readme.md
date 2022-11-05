# Node Concurrent Task Execution

## _Explanation of approach_

I have completed the challenge using NodeJS worker threads because as in task it was required to run tasks concurrently and Javascript doesn’t inherently support concurrency, worker threads provides a workaround to run multiple threads in a single process.

- They don't obstruct main execution. We are able to employ as many worker threads as necessary. They run a single process with multiple threads. Executing one event loop per thread.
  - Solving: if N = 10, then there are
    always 10 promises being resolved (e.g. API requests). When one finishes, another immediately starts.
- Worker threads are run on these isolated V8 engines, each worker having its own V8 engine and event queue. In other words, when workers are active, a Node application has multiple Node instances running in the same process which mean we just need to give these service workers tasks and they will perform it on there own.
  - Solving: if N = 3, then you will execute 'A', 'B', and 'C' in the taskList concurrently. Once B
    finishes, you then execute 'D', and so on.

## _Requirments_

Node 12 or newer (since worker threads were released in Node v10 and got stable release in Node v12)

## Installation

Install the dependencies and devDependencies.

```sh
cd tasks
yarn
```

## Running

Spin up the script.

```sh
yarn start
```
