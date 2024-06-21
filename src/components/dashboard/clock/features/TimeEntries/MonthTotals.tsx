import { findAllUserTimedTasks } from "@/src/database/serverStorage/TimedTasks/timedtasks.actions";
import { formatElapsedTime } from "../../utils";
import { timedTask } from "@prisma/client";

const MonthTotals = async () => {
  const userTasks = await findAllUserTimedTasks();
  const taskData = userTasks.map((task: timedTask) => {
    const startTime = task.startTime;
    const stopTime = task.stopTime;

    if (stopTime === null) {
      return 0;
    }

    return Number(stopTime) - Number(startTime);
  });

  let treatedTaskData = [...taskData];
  let total = treatedTaskData.reduce((total: number, num: number) => {
    return total + num;
  }, 0);

  return (
    <div className="flex items-center gap-2">
      <span className="text-nowrap">Month Total</span>
      <span className="font-bold text-xl text-nowrap">
        {!total ? formatElapsedTime(0) : formatElapsedTime(total)}
      </span>
    </div>
  );
};

export default MonthTotals;
