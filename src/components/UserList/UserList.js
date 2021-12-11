import React, { useEffect, useState, useContext } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import * as S from "./style";
import ListCmp from "components/List/ListCmp";
import Favorites from "components/Favorites";
import NavBarContext from "Context";

const UserList = ({ users, isLoading ,navBar}) => {

  const context = useContext(NavBarContext);

  const [countries, setCountries] = useState([]);

  const [favorites, setFavorites] = useState(false);

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
      <S.Filters>
        <CheckBox value="Brazil" label="Brazil" onChange={filterByCountry} />
        <CheckBox value="Australia" label="Australia" onChange={filterByCountry} />
        <CheckBox value="Canada" label="Canada" onChange={filterByCountry} />
        <CheckBox value="Germany" label="Germany" onChange={filterByCountry} />
        <CheckBox value="Spain" label="Spain" onChange={filterByCountry} />
      </S.Filters>

    {context.navBar === 0 &&
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
        {context.navBar === 1 &&
        
        <S.List>
          {favoriteUsers.map((user, index) => {
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
    </S.UserList>
  );
};

export default UserList;
