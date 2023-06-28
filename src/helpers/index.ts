import {
  widthPercentageToDP as wpd,
  heightPercentageToDP as hpd,
} from 'react-native-responsive-screen';

export const getWpHp = () => {
  const wp = wpd(100) < hpd(100) ? wpd : hpd;
  const hp = hpd(100) > wpd(100) ? hpd : wpd;

  return {
    wp: wp,
    hp: hp,
  };
};
