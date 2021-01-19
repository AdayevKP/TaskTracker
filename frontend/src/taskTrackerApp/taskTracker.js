import TaskTrackerUi from './taskTrackerUi'


class TaskTracker{
    constructor(path) {
        this.ui = new TaskTrackerUi(this, path)
        this.path = path
    }


    getTasks(){
        const json_tasks = [
            '{"id": 1,"name": "Work","color": "#CD9A8F", "active": true}',
            '{"id": 2, "name": "Study", "color": "#BCC8A7", "active": true}',
            '{"id": 3, "name": "Autizm", "color": "#B5C4C6", "active": true}'
        ]
        // get user's tasks from server
        // this is temporary plug
        this.getWeek()
        return Array.from(json_tasks, (task_str) => JSON.parse(task_str))
    }

    getWeek(fromCurrent=0){
        const week_raw = '{"days":[{"name": "MON", "date": "23.01.21", "sessions": [{"task": {"id": 1,"name": "Work","color":"#CD9A8F","active": true}, "duration": 4.2}, {"task": {"id": 2, "name": "Study", "color": "#BCC8A7", "active": true}, "duration": 2.2}]},{"name": "TUE", "date": "24.01.21", "sessions": []},{"name": "WED", "date": "25.01.21", "sessions": [{"task": {"id": 3, "name": "Autizm", "color": "#B5C4C6", "active": true}, "duration": 1.2}, {"task": {"id": 2, "name": "Study", "color": "#BCC8A7", "active": true}, "duration": 5.2}]},{"name": "THU", "date": "26.01.21", "sessions": []},{"name": "FRI", "date": "27.01.21", "sessions": []},{"name": "SAT", "date": "28.01.21", "sessions": []},{"name": "SUN", "date": "29.01.21", "sessions": []}]}'
        // get week info from server
        // this is temporary plug

        const week = JSON.parse(week_raw)
        return week
    }

    stopActiveSessions(){
        //not implemented yet
    }

    startSession(taskId){
        //not implemented yet
    }

    createTask(name, color){
        //not implemented yet
    }
}

export default TaskTracker;
