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

    const column = this.state.columns[source.droppableId];
    const newItemsIds = Array.from(column.itemsId);
    newItemsIds.splice(source.index, 1);
    newItemsIds.splice(destination.index, 0, draggableId);
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <Container>
        {this.state.columnOrder.map((columnId) => {
        const column = this.state.columns[columnId];
        // const items = column.itemsId.map((itemsId: string) => this.state.items[itemsId])

        return <Column key={column.id} column={column} />;

      })}
      </Container>
      
    </DragDropContext>
    
    )
  }
}

export default App;
