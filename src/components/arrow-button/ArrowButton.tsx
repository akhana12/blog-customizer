import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { FC } from 'react';
import cn from 'classnames';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick?: OnClick;
	isOpen?: boolean;
}

export const ArrowButton: FC<ArrowButtonProps> = ({ onClick, isOpen }) => {
	const container = isOpen ? styles.container_open : styles.container;
	const arrowImage = isOpen ? styles.arrow_open : styles.arrow;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть форму редактирования свойств'
			className={cn(styles.container, container)}
			onClick={onClick}>
			<img
				src={arrow}
				alt='Иконка стрелки'
				className={cn(styles.arrow, arrowImage)}
			/>
		</div>
	);
};
