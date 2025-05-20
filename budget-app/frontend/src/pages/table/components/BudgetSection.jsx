import { Draggable, Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";
import BudgetRow from "./BudgetRow";

const BudgetSection = ({
    data = [],
    sectionId = "",
    type = "",
    onUpdateRow = () => {},
    activeDroppableId = null,
}) => (
    <Droppable
        droppableId={sectionId}
        direction="vertical"
        isDropDisabled={activeDroppableId !== sectionId}
    >
        {(provided, snapshot) => (
            <tbody
                key={type}
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={clsx(
                    "transition-all duration-200",
                    snapshot.isDraggingOver ? "bg-blue-50 border-2 border-blue-700" : ""
                )}
            >
                {data.map((row, rowIndex) => (
                    <Draggable key={row._id} draggableId={row._id.toString()} index={rowIndex}>
                        {(provided, snapshot) => {
                            const transformFix = provided.draggableProps.style?.transform?.replace(
                                /translate\(([^,]+),/,
                                "translate(0,"
                            );
                            return (
                                <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={clsx(
                                        "transition-colors duration-150",
                                        snapshot.isDragging && "bg-sky-50 opacity-80"
                                    )}
                                    style={{
                                        ...provided.draggableProps.style,
                                        transform: transformFix,
                                        display: "table-row",
                                    }}
                                >
                                    <BudgetRow
                                        row={row}
                                        type={type}
                                        onUpdateRow={onUpdateRow}
                                        dragHandleProps={provided.dragHandleProps}
                                    />
                                </tr>
                            );
                        }}
                    </Draggable>
                ))}
                {provided.placeholder}
            </tbody>
        )}
    </Droppable>
);

export default BudgetSection;
