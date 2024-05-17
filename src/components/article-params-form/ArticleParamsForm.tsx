import React, { useState, useRef, useEffect, SyntheticEvent } from 'react';
import cn from 'classnames';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select/Select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

// Определение состояния компонента
type ArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (param: {
		backgroundColor: OptionType;
		fontFamilyOption: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
		fontColor: OptionType;
	}) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	// Хуки для управления состояниями выбранных параметров стиля
	const [fontSelectState, setFontSelectState] = useState<OptionType>(
		props.state.fontFamilyOption
	);
	const [fontSizeSelectState, setFontSizeSelectState] = useState<OptionType>(
		props.state.fontSizeOption
	);
	const [fontColorSelectState, setFontColorSelectState] = useState<OptionType>(
		props.state.fontColor
	);
	const [backgroundColorSelectState, setBackgroundColorSelectState] =
		useState<OptionType>(props.state.backgroundColor);
	const [contentWidthSelectState, setContentWidthSelectState] =
		useState<OptionType>(props.state.contentWidth);

	// Обработчик клика по кнопке переключения формы
	const handleButtonClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const container = isFormOpen ? styles.container_open : styles.container;

	// Обработчик события отправки формы для установки выбранных стилей
	const handleFormSubmit = (event?: SyntheticEvent) => {
		event?.preventDefault();
		props.setState({
			fontFamilyOption: fontSelectState,
			fontSizeOption: fontSizeSelectState,
			fontColor: fontColorSelectState,
			backgroundColor: backgroundColorSelectState,
			contentWidth: contentWidthSelectState,
		});
	};

	// Функция сброса всех параметров к значениям по умолчанию
	const setDefaultToAllSelections = (event?: SyntheticEvent) => {
		event?.preventDefault();
		props.setState(defaultArticleState);
		setFontSelectState(defaultArticleState.fontFamilyOption);
		setFontSizeSelectState(defaultArticleState.fontSizeOption);
		setFontColorSelectState(defaultArticleState.fontColor);
		setBackgroundColorSelectState(defaultArticleState.backgroundColor);
		setContentWidthSelectState(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		if (!isFormOpen) return;
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
	}, [asideRef.current]);

	// Обработчик изменения выбранного шрифта
	const handleFontSelectChange = (fontSelected: OptionType) => {
		setFontSelectState(fontSelected);
	};

	// Обработчик изменения выбранного размера шрифта
	const handleFontSizeSelectChange = (fontSizeSelected: OptionType) => {
		setFontSizeSelectState(fontSizeSelected);
	};

	// Обработчик изменения выбранного цвета шрифта
	const handleFontColorSelectChange = (fontColorSelected: OptionType) => {
		setFontColorSelectState(fontColorSelected);
	};

	// Обработчик изменения выбранного цвета фона
	const handleBgColorChange = (backgroundColorSelected: OptionType) => {
		setBackgroundColorSelectState(backgroundColorSelected);
	};

	// Обработчик изменения выбранной ширины контента
	const handleContentWidthSelectChange = (contentWidthSelected: OptionType) => {
		setContentWidthSelectState(contentWidthSelected);
	};

	return (
		<>
			<ArrowButton onClick={handleButtonClick} isOpen={isFormOpen} />
			<aside className={cn(styles.container, container)} ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={setDefaultToAllSelections}>
					<Select
						selected={fontSelectState}
						options={fontFamilyOptions}
						onChange={handleFontSelectChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='radioFonts'
						options={fontSizeOptions}
						selected={fontSizeSelectState}
						title='Размер шрифта'
						onChange={handleFontSizeSelectChange}
					/>
					<Select
						selected={fontColorSelectState}
						options={fontColors}
						onChange={handleFontColorSelectChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColorSelectState}
						options={backgroundColors}
						onChange={handleBgColorChange}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidthSelectState}
						options={contentWidthArr}
						onChange={handleContentWidthSelectChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
