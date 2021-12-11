import React from "react";
import ListCmp from "components/UserList";
import Spinner from "components/Spinner";
import * as S from "./style";

const Favorites = ({favoriteUsers, isLoading, addToFavorite}) => {

  return (
    <S.List>
    {favoriteUsers.map((user, index) => {
      return (
        <ListCmp key={index} index={index} user={user} addToFavorite={addToFavorite} />
        );
      })}
      {isLoading && (
        <S.SpinnerWrapper>
          <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
        </S.SpinnerWrapper>
      )}
      </S.List>
  );
};

export default Favorites;
