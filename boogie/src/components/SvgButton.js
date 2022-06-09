import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled, {buttonUnstyledClasses} from '@mui/base/ButtonUnstyled';
import {styled} from '@mui/system';

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
    const {children, value , ...other} = props;

    return (
        <svg width="200" height="40" {...other} ref={ref}>
            <polygon points="0,40 0,0 200,0 200,40" className="bg"/>
            <polygon points="0,40 0,0 200,0 200,40" className="borderEffect"/>
            <foreignObject x="0" y="0" width="200" height="40">
                <div className="content">{children}</div>
            </foreignObject>
        </svg>
    );
});

ButtonRoot.propTypes = {
    children: PropTypes.node,
};

const CustomButtonRoot = styled(ButtonRoot)(
    ({theme}) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${
        theme.palette.mode === 'light' ? 'rgba(61,92,87,0.91)' : 'rgba(166,196,177,0.4)'
    };
  --hover-color: ${
        theme.palette.mode === 'light'
            ? 'rgba(166,196,177,0.39)'
            : 'rgba(61,92,87,0.08)'
    };
  --active-color: ${
        theme.palette.mode === 'light'
            ? 'rgba(61,92,87,0.31)'
            : 'rgba(144,202,249,0.24)'
    };

  & polygon {
    fill: transparent;
    transition: all 1s ease;
    pointer-events: none;
  }

  & .bg {
    stroke: var(--main-color);
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.25));
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} {
    & .bg {
      fill: var(--active-color);
      transition: fill 900ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: montserrat, sans-serif;
      font-size: 15px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref}/>;
});
export default function UnstyledButtonCustom(props) {
    return <SvgButton onClick={props.onClick}>{props.value}</SvgButton>;
}

