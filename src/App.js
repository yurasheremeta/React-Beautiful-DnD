import React, { Component } from 'react';
import data from './data/data';
import { Column } from './components/Column/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`
class App extends Component {
   state = data;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish){
      const newItemsIds = Array.from(start.itemsId);
      newItemsIds.splice(source.index, 1);
      newItemsIds.splice(destination.index, 0, draggableId);
      
      const newColumn = {
        ...start,
        itemsIds: newItemsIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        },
      };

      this.setState(newState);
      return;
    }

   const startItemsIds = Array.from(start.itemsIds);
   startItemsIds.splice(source.index, 1);
   const newStart = {
     ...start,
     itemsIds: startItemsIds,
   };

   const finishItemsIds = Array.from(finish.itemsId);
   finishItemsIds.splice(destination.index , 0 , draggableId);
   const newFinish = {
     ...finish,
     itemsIds: finishItemsIds
   };

   const newState = {
     ...this.state,
     columns: {
       ...this.state.columns,
       [newStart.id]: newStart,
       [newFinish.id]: newFinish,
     }
   }
   this.setState(newState);
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <Container>
        {this.stae.columnOrder.map((columnId) => {
        const column = this.state.columns[columnId];
        // const items = column.itemsId.map((itemsId) => this.state.items[itemsId])

        return <Column key={column.id} column={column} />;

      })}
      </Container>
      
    </DragDropContext>
    
    )
  }
}

export default App;
