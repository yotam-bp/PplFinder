import React, { useEffect, useState, useContext } from "react";
import NavBarContext from "Context";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import ListCmp from "components/ListCmp/ListCmp";
import * as S from "./style";
import Text from "components/Text";

const UserList = ({ users, isLoading }) => {
  const context = useContext(NavBarContext);

  const [countries, setCountries] = useState([]);

  const [favoriteUsers, setFavoriteUsers] = useState(() => {
    const localStorageUsers = localStorage.getItem("favoriteUsers");
    if (localStorageUsers) {
      return JSON.parse(localStorageUsers);
    }
    return [];
  })

  useEffect(() => {
    localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
  }, [favoriteUsers])

  const addToFavorite = (user) => {
    if (favoriteUsers.includes(user)) {
      favoriteUsers.splice(favoriteUsers.indexOf(user), 1);
      setFavoriteUsers([...favoriteUsers]);
    }
    else {
      setFavoriteUsers(favoriteUsers => [...favoriteUsers, user])
    }
  }

  const filterdUsers = users.filter((user) => {
    if (countries.length === 0) return users
    else return countries.includes(user.location.country)
  });

  const filterByCountry = (event) => {
    if (countries.includes(event)) {
      countries.splice(countries.indexOf(event), 1);
      setCountries([...countries]);
    }
    else setCountries(countries => [...countries, event])
  }

  return (
    <S.UserList>
      {context.navBarIndex === 0 &&
        <S.Filters>
          <CheckBox value="Brazil" label="Brazil" onChange={filterByCountry} />
          <CheckBox value="Australia" label="Australia" onChange={filterByCountry} />
          <CheckBox value="Canada" label="Canada" onChange={filterByCountry} />
          <CheckBox value="Germany" label="Germany" onChange={filterByCountry} />
          <CheckBox value="Spain" label="Spain" onChange={filterByCountry} />
        </S.Filters>
      }
      {context.navBarIndex === 0 &&
        <S.List>
          {filterdUsers.map((user, index) => {
            return (
              <ListCmp key={index} index={index} user={user} addToFavorite={addToFavorite} favoriteUsers={favoriteUsers} />
            );
          })}
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      }
      {context.navBarIndex === 1 &&
        <S.List>
          {favoriteUsers.map((user, index) => {
            return (
              <ListCmp key={index} index={index} user={user} addToFavorite={addToFavorite} favoriteUsers={favoriteUsers} />
            );
          })}
          {!favoriteUsers.length && <Text size="30px" bold>No favorites yet</Text>}
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      }
    </S.UserList>
  );
};

export default UserList;
