# Distributed Workers sample

A server send tasks to be executed to one or more worker. The task is procesed at worker. Only one task
is processed by worker. The task is the clasical word counting task.

## Setup

Eecute at command line:
```
npm install
```
This command installs the needed modules: `simplemessages` for sending and receiving messages between server/clients, and `simplefunc` to
encode/decode simple objects with instance functions. The task (an object with functions) is serialized/deserialized, so
the functions are defined at server but they run at workers.

## Run

Launch the server:
```
node server
```
It shows
```
Server listening on port 3000
```

Run a worker with command line:
```
node worker
```
The worker connects to server. The server sends a message with a task to be executed at worker. The worker receives
and run the task. At end, the worker stops.

The worker output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

The implementation is naive. It uses `next` callbacks but without async calls in `map` or `process`.
If there were thousands of items or key/values produced by `map`, this approach would generate 
a lot of stacked calls.


