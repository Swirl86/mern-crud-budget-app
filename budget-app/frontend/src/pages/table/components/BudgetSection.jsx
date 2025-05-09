import { Draggable, Droppable } from "react-beautiful-dnd";
import BudgetRow from "./BudgetRow";

const BudgetSection = ({ data, sectionId, type, onUpdateRow }) => (
    <Droppable droppableId={sectionId}>
        {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {data.map((row, rowIndex) => (
                    <Draggable key={row._id} draggableId={row._id.toString()} index={rowIndex}>
                        {(provided) => (
                            <tr ref={provided.innerRef} {...provided.draggableProps}>
                                <BudgetRow
                                    row={row}
                                    type={type}
                                    onUpdateRow={onUpdateRow}
                                    dragHandleProps={provided.dragHandleProps}
                                />
                            </tr>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </tbody>
        )}
    </Droppable>
);

export default BudgetSection;
