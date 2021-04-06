import { makeStyles } from '@material-ui/core/styles';

export const infoStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.info.main
    },
    infobar: {
        backgroundColor: '#00ADB5',
        padding: '679890560875513vh'
    }
}));