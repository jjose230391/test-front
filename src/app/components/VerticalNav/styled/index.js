import {Box, styled} from "@mui/system";
import {Paragraph, Span} from "../../Typography";

export const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
    fontSize: '12px',
    marginTop: '20px',
    marginLeft: '15px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    display: mode === 'compact' && 'none',
    color: theme.palette.text.secondary,
}))

export const ExtAndIntCommon = {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '4px',
    height: 44,
    whiteSpace: 'pre',
    marginBottom: '8px',
    textDecoration: 'none',
    justifyContent: 'space-between',
    transition: 'all 150ms ease-in',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
    },
    '&.compactNavItem': {
        overflow: 'hidden',
        justifyContent: 'center !important',
    },
    '& .icon': {
        fontSize: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
        verticalAlign: 'middle',
    },
}
export const ExternalLink = styled('a')(({ theme }) => ({
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
}))

export const InternalLink = styled(Box)(({ theme }) => ({
    '& a': {
        ...ExtAndIntCommon,
        color: theme.palette.text.primary,
    },
    '& .navItemActive': {
        backgroundColor: 'rgba(255, 255, 255, 0.16)',
    },
}))

export const StyledText = styled(Span)(({ mode }) => ({
    fontSize: '0.875rem',
    paddingLeft: '0.8rem',
    display: mode === 'compact' && 'none',
}))

export const BulletIcon = styled('div')(({ theme }) => ({
    padding: '2px',
    marginLeft: '24px',
    marginRight: '8px',
    overflow: 'hidden',
    borderRadius: '300px',
    background: theme.palette.text.primary,
}))

export const BadgeValue = styled('div')(() => ({
    padding: '1px 8px',
    overflow: 'hidden',
    borderRadius: '300px',
}))