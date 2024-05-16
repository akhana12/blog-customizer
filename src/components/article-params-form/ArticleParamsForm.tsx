import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select/Select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

// Определение состояния компонента
type ArticleState = {
	bgColorState: OptionType;
	contentWidthState: OptionType;
	fontColorState: OptionType;
	fontFamilyState: OptionType;
	fontSizeState: OptionType;
	setBgColorState: React.Dispatch<React.SetStateAction<OptionType>>;
	setContentWidthState: React.Dispatch<React.SetStateAction<OptionType>>;
	setFontColorState: React.Dispatch<React.SetStateAction<OptionType>>;
	setFontState: React.Dispatch<React.SetStateAction<OptionType>>;
	setFontSizeState: React.Dispatch<React.SetStateAction<OptionType>>;
	onResetClick: () => void;
	onSubmitClick: () => void;
};

export const ArticleParamsForm = ({
	fontFamilyState,
	setFontState,
	fontSizeState,
	setFontSizeState,
	fontColorState,
	setFontColorState,
	bgColorState,
	setBgColorState,
	contentWidthState,
	setContentWidthState,
	onResetClick,
	onSubmitClick,
}: ArticleState) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Обработчик клика по кнопке переключения формы
	const handleButtonClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	// Обработчик изменения выбранного шрифта
	const handleFontSelectChange = (fontSelected: OptionType) => {
		setFontState(fontSelected);
	};

	// Обработчик изменения выбранного размера шрифта
	const handleFontSizeSelectChange = (fontSizeSelected: OptionType) => {
		setFontSizeState(fontSizeSelected);
	};

	// Обработчик изменения выбранного цвета шрифта
	const handleFontColorSelectChange = (fontColorSelected: OptionType) => {
		setFontColorState(fontColorSelected);
	};

	// Обработчик изменения выбранного цвета фона
	const handleBgColorChange = (backgroundColorSelected: OptionType) => {
		setBgColorState(backgroundColorSelected);
	};

	// Обработчик изменения выбранной ширины контента
	const handleContentWidthSelectChange = (contentWidthSelected: OptionType) => {
		setContentWidthState(contentWidthSelected);
	};

	// Обработчик события отправки формы
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmitClick();
	};

	const container = isFormOpen ? styles.container_open : styles.container;

	return (
		<>
			<ArrowButton onClick={handleButtonClick} isOpen={isFormOpen} />
			<aside className={cn(styles.container, container)} ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={fontFamilyState}
						options={fontFamilyOptions}
						onChange={handleFontSelectChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='radioFonts'
						options={fontSizeOptions}
						selected={fontSizeState}
						title='Размер шрифта'
						onChange={handleFontSizeSelectChange}
					/>
					<Select
						selected={fontColorState}
						options={fontColors}
						onChange={handleFontColorSelectChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={bgColorState}
						options={backgroundColors}
						onChange={handleBgColorChange}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidthState}
						options={contentWidthArr}
						onChange={handleContentWidthSelectChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onResetClick} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
