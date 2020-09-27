import React from 'react'
import cn from 'classnames'
import Button from '../button'
import styles from './style.module.css'
import TextTitle from '../title';
import {Home} from '../icons';

function LinkedButton({ href, selected, children, className, ...props }) {
  return (
    <Button
      className={cn(
        styles.navButton,
        className
      )}
      href={href}
      {...props}
    >
      <TextTitle>{children}</TextTitle>

    </Button>
  )
}
export default LinkedButton
