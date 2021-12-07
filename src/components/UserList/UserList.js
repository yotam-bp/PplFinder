import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countries, setCountries] = useState([]);

  const filterdUsers = users.filter((user) => {
    if (countries.length === 0) return users
    else return countries.includes(user.location.country)
  });

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };


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
      <S.List>
        {filterdUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
