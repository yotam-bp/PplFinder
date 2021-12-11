import React, { useEffect, useState, useContext } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import Favorites from "components/Favorites";
import UserContext from "Context";

const Home = () => {
  const { users, isLoading } = usePeopleFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <Text size="64px" bold>
          </Text>
        <UserList users={users} isLoading={isLoading} />
        <hr />
      </S.Content>
    </S.Home>
  );
};

export default Home;
