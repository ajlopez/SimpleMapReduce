# Distributed Workers sample

A server send tasks to be executed to one or more worker. The task is procesed at worker. Only one task
is processed by worker. The task is the clasical word counting task.

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

