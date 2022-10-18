// render a button based on the passed props
import React from 'react';
import classes from './button.module.scss';
import { Button as BootstrapButton } from 'react-bootstrap';
import Link from '../Link/Link';
import classNames from 'classnames/bind';

 
/**
 * @param autoFocus
 * @param type
 * @param children
 * @param target
 * @param to
 * @param toParams
 * @param activeClassName
 * @param variant
 * @param href
 * @param disabled
 * @param className
 * @param style
 * @param onClick
 * @param queryParams
 * @param rel
 * @param onMouseEnter
 * @param onMouseLeave
 * @returns {*}
 * @constructor
 */
export default function Button({
  autoFocus,
  type,
  target,
  children,
  to,
  toParams,
  activeClassName,
  variant,
  href,
  disabled,
  style,
  onClick,
  queryParams,
  rel,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) {
  const getButtonClassNames = () => {
    if (variant) {
      const variantClasses = classNames.bind(classes);
      // return the class of the button
      return classNames(
        'btn',
        className,
        classes.btn,
        variantClasses({
          cta: variant.includes('cta'),
          ctaSecondary: 'cta secondary' === variant,

          action: variant.includes('action'),
          actionWhite: 'action white' === variant,

          hint: variant.includes('hint'),
          hintSecondary: 'hint secondary' === variant,
          hintLight: 'hint light' === variant,

          link: variant.includes('link'),
          navLink: variant.includes('navlink'),
          navLinkDark: 'navlink dark' === variant,

          search: 'search' === variant,
          footer: 'footer' === variant,
        })
      );
    } else {
      return classNames('btn', className, classes.btn);
    }
  };

  const buttonProps = {
    autoFocus,
    type,
    variant,
    href,
    disabled,
    style,
    onClick,
    target,
    rel,
    onMouseEnter,
    onMouseLeave,
    className: getButtonClassNames(),
  };

  // if the button has a to (link) passed as a props render a Link
  if (to) {
    return (
      <Link
        {...buttonProps}
        to={to}
        toParams={toParams}
        queryParams={queryParams}
        variant={variant}
        target={target}
        activeClassName={activeClassName}
        style={style}
      >
        {children}
      </Link>
    );
  }

  // if there is no to prop passed to this component render a normal button
  else {
    return <BootstrapButton {...buttonProps}>{children}</BootstrapButton>;
  }
}
