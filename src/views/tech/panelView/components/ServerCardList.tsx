// ServerCardList.tsx
import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ServerCard from './ServerCard';

type NodeObj = {
    name: string;
    type: 'MC' | 'AppD';
    aaCode: string;
    error: string;
    time: string;
    status: 'Error' | 'Warning' | 'Working';
    link: string;
  };

type ServerCardListProps = {
  filteredServerList: NodeObj[];
};

const ServerCardList: React.FC<ServerCardListProps> = ({ filteredServerList }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
      {filteredServerList.map((serverNode) => (
        <ServerCard
          key={serverNode.name}
          name={serverNode.name}
          error={serverNode.error}
          time={serverNode.time}
          status={serverNode.status}
        />
      ))}
    </SimpleGrid>
  );
};

export default ServerCardList;
