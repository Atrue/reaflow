import React, { useState } from 'react';
import { Canvas } from '../src/Canvas';
import { Node, Edge, MarkerArrow, Port, Icon, Arrow, Label, Remove, Add } from '../src/symbols';
import { NodeData, PortData } from '../src/types';

export const Ports = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          ports: [
            {
              id: '1-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-to',
              width: 10,
              height: 10,
              side: 'NORTH'
            }
          ]
        },
        {
          id: '2',
          text: 'Node 2',
          ports: [
            {
              id: '2-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '2-to',
              width: 10,
              height: 10,
              side: 'NORTH'
            }
          ]
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2',
          fromPort: '1-from',
          toPort: '2-to'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const ComplexPorts = () => (
  <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
    <Canvas
      nodes={[
        {
          id: '1',
          text: 'Node 1',
          ports: [
            {
              id: '1-from-1',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-from-2',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-from-3',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '1-to',
              width: 10,
              height: 10,
              hidden: true,
              side: 'NORTH'
            }
          ]
        },
        {
          id: '2',
          text: 'Node 2',
          ports: [
            {
              id: '2-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '2-to',
              width: 10,
              height: 10,
              hidden: true,
              side: 'NORTH'
            }
          ]
        },
        {
          id: '3',
          text: 'Node 3',
          ports: [
            {
              id: '3-from',
              width: 10,
              height: 10,
              side: 'SOUTH'
            },
            {
              id: '3-to',
              width: 10,
              height: 10,
              hidden: true,
              side: 'NORTH'
            }
          ]
        }
      ]}
      edges={[
        {
          id: '1-2',
          from: '1',
          to: '2',
          fromPort: '1-from-1',
          toPort: '2-to'
        },
        {
          id: '1-3',
          from: '1',
          to: '3',
          fromPort: '1-from-3',
          toPort: '3-to'
        }
      ]}
      onLayoutChange={layout => console.log('Layout', layout)}
    />
  </div>
);

export const LinkingPortRestrictions = () => {
  const [nodes] = useState<any[]>([
    {
      id: '1',
      text: 'Node 1',
      ports: [
        {
          id: '1-from-1',
          width: 10,
          height: 10,
          side: 'SOUTH'
        },
        {
          id: '1-from-2',
          width: 10,
          height: 10,
          side: 'SOUTH'
        },
        {
          id: '1-to',
          width: 10,
          height: 10,
          hidden: true,
          side: 'NORTH'
        }
      ]
    },
    {
      id: '2',
      text: 'Node 2'
    },
    {
      id: '3',
      text: 'Node 3'
    }
  ]);

  const [edges, setEdges] = useState<any[]>([
    {
      id: '1-2',
      from: '1',
      to: '2',
      fromPort: '1-from-1',
      toPort: '2-to'
    }
  ]);

  return (
    <div style={{ border: 'solid 1px #12131e', height: '80vh', width: '80vw', position: 'relative' }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onNodeLinkCheck={(from: NodeData, to: NodeData, port: PortData) => {
          if (from.id === to.id || to.id === '1') {
            return false;
          }

          if (port?.id === '1-from-2' && to.id === '3') {
            return false;
          }

          return true;
        }}
        onNodeLink={(from: NodeData, to: NodeData, port: PortData) => {
          const id = `${from.id}-${to.id}`;

          setEdges([
            ...edges,
            {
              id,
              from: from.id,
              to: to.id,
              fromPort: port.id,
              toPort: `${to.id}-to`
            }
          ]);
        }}
        onLayoutChange={layout => console.log('Layout', layout)}
      />
    </div>
  );
};

export default {
  title: 'Demos/Ports',
  component: Canvas,
  parameters: {
    actions: {
      argTypesRegex: '^on.*'
    }
  },
  subcomponents: {
    Node,
    Edge,
    MarkerArrow,
    Arrow,
    Icon,
    Label,
    Port,
    Remove,
    Add
  }
};