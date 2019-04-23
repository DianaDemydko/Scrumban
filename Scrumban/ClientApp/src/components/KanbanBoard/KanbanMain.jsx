import React from 'react';
import KanbanBoard from './KanbanBoard';

import "./css/KanbanMain.css"

export default class Kanban extends React.Component {
    render() {

        return (
            <div id="kanban-container">
                <h1 id="kanban-board-header-text" >Kanban Board</h1>
                <KanbanBoard />
            </div>
        );
    }
}