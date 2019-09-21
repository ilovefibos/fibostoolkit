import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from 'components/Grid/GridItem';
import {
  defaultFont,
  primaryColor,
  dangerColor,
  successColor,
} from 'assets/jss/material-dashboard-pro-react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';

const ToolSelect = props => {
  const {
    formControlProps,
    classes,
    xs,
    sm,
    md,
    lg,
    id,
    labelText,
    placeholder,
    type,
    white,
    selections,
    error,
    success,
    ...formProps
  } = props;
  const { values, handleBlur, handleChange } = formProps;
  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  return (
    <GridItem xs={xs || 12} sm={sm || 12} md={md || lg || 6} lg={lg || md || 6}>
      <FormControl {...formControlProps} className={classes.formControl}>
        {labelText !== undefined ? (
          <InputLabel
            className={`${classes.labelRoot} ${labelClasses}`}
            htmlFor={id}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <FormHelperText>
          {
            selections[selections.findIndex(item => item.value === values[id])]
              .hint
          }
        </FormHelperText>
        <Select
          name={id}
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
          displayEmpty
          input={
            <Input
              classes={{
                input: classes.input,
                underline: underlineClasses,
                disabled: classes.disabled,
              }}
            />
          }
        >
          {selections.map(item => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </GridItem>
  );
};

const selectStyleRule = {
  disabled: {
    '&:before': {
      borderColor: 'transparent !important',
    },
  },
  labelRoot: {
    ...defaultFont,
    color: '#AAAAAA !important',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.42857',
    top: '10px',
    '& + $underline': {
      marginTop: '0px',
    },
  },
  labelRootError: {
    color: `${dangerColor} !important`,
  },
  labelRootSuccess: {
    color: `${successColor} !important`,
  },
  formControl: {
    margin: '0 0 1px 0',
    paddingTop: '6px',
    position: 'relative',
    '& svg,& .fab,& .far,& .fal,& .fas': {
      color: '#495057',
    },
  },
  input: {
    color: '#495057',
    '&,&::placeholder': {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400',
      lineHeight: '1.42857',
      opacity: '1',
    },
    '&::placeholder': {
      color: '#AAAAAA',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#D2D2D2 !important',
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: primaryColor,
    },
  },
  underlineError: {
    '&:after': {
      borderColor: dangerColor,
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: successColor,
    },
  },
};

export default withStyles(selectStyleRule)(ToolSelect);
