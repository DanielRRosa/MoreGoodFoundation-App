import { findAllTimedTasks } from "@/components/database/TimedTasks/timedtasks.actions";
import { formatElapsedTime } from "../../utils";

const MonthTotals = async () => {
  const userTasks = await findAllTimedTasks();
  const taskData = userTasks.map((task) => {
    const startTime = parseInt(task.startTime);
    const stopTime = parseInt(task.stopTime);

    return stopTime - startTime;
  });

  let treatedTaskData = [...taskData];
  let total = treatedTaskData.reduce((total, num) => {
    return parseInt(total + num);
  }, 0);

  return (
    <div className="flex items-center gap-2">
      <span>Month Total</span>
      <span className="font-bold text-xl">
        {total <= 0 ? formatElapsedTime(0) : formatElapsedTime(total)}
      </span>
    </div>
  );
};

export default MonthTotals;
