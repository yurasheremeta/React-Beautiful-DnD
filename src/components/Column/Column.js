import * as React from 'react';
import styled from 'styled-components';
import { Item } from '../Item/Item';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const ItemList = styled.div`
    padding: 8px;
    flex-grow: 1;
`;
export class Column extends React.Component {
  render() {
    // const { provided, innerRef } = this.props;
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <ItemList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.items && this.props.items.map((items, index) =>
                <Item key={items.id} item={items} index={index} />)}

            </ItemList>
          )}
            </Droppable>

      </Container>

    )
  }
}