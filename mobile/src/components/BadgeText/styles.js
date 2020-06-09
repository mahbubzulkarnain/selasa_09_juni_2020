import styles from '../../styles';

export default {
  container: {
    alignItems: 'center',
    borderLeftColor: styles.color.background,
    borderLeftWidth: 6,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
    width: 50,
  },
  wrapper: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styles.color.primary,
    borderRadius: 50,
    bottom: 10,
    left: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
};
