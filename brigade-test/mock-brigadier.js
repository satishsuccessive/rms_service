var mock = require('mock-require'); 

mock('brigadier', { 
    events: {
        on: function(name, f) {}
    },
    Job: function(name) {
      return {
          storage: {
              enabled:false
          }
      }  
    },
});

exports.logJob = function logJob(job, name) {
    console.log('-------------------------')
    console.log(name)
    console.log('-------------------------')
    console.log(job);
    console.log()
    console.log("TASKS:")
    
    for (var i in job.tasks)
    {
        console.log(job.tasks[i])
        if (job.tasks[i].includes("${project.secrets")) {
            throw "Bad substitution, are you missing back-ticks for this task?"
        }
    }

    console.log()
}
