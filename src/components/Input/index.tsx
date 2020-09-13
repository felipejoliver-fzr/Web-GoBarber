import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  // funcao utilizando callback para a função nao ser recriada na memoria toda vez que esse componente for renderizado
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // se o value do inputRef tiver algum valor seta true, se nao, false
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isField} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
