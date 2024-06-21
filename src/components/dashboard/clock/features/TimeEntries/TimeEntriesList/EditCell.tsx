import { Button } from "@/src/components/ui/button";

import { Pencil } from "lucide-react";

const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(row);
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  return meta?.editedRows[row.id] ? (
    <div className="full-flex justify-end">
      <Button variant="ghost" onClick={setEditedRows} name="cancel">
        Cancel
      </Button>
      <Button onClick={setEditedRows} name="done">
        Edit
      </Button>
    </div>
  ) : (
    <Button variant="ghost" size="icon" onClick={setEditedRows} name="edit">
      <Pencil className="size-4" />
    </Button>
  );
};

export default EditCell;
