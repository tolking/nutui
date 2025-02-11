import { computed, ComputedRef, watchEffect, reactive, toRefs, watch } from 'vue';

import { popupProps } from './props';

const initIndex = 2000;
let _zIndex = initIndex;

export const component = (componentName: string, components: any) => {
  return {
    components,
    props: {
      ...popupProps
    },
    emits: ['click-pop', 'click-close-icon', 'open', 'close', 'opened', 'closed', 'click-overlay', 'update:visible'],

    setup(props: any, { emit }: any) {
      const state = reactive({
        zIndex: props.zIndex,
        showSlot: true,
        closed: props.closeable
      });

      const classes = computed(() => {
        const prefixCls = componentName;
        return {
          [prefixCls]: true,
          ['round']: props.round,
          [`nut-popup--${props.position}`]: true,
          [`nut-popup--${props.position}--safebottom`]: props.position === 'bottom' && props.safeAreaInsetBottom,
          [props.popClass]: true
        };
      });

      const popStyle: ComputedRef = computed(() => {
        return {
          zIndex: state.zIndex,
          transitionDuration: `${props.duration}s`,
          ...props.style
        };
      });

      const transitionName: ComputedRef = computed(() => {
        return props.transition ? props.transition : `nut-popup-slide-${props.position}`;
      });

      const open = () => {
        if (props.zIndex !== initIndex) {
          _zIndex = Number(props.zIndex);
        }
        emit('update:visible', true);
        state.zIndex = ++_zIndex;
        if (props.destroyOnClose) {
          state.showSlot = true;
        }
        emit('open');
      };

      const close = () => {
        // if (!props.visible) return; //避免重复调用
        emit('update:visible', false);
        emit('close');
        if (props.destroyOnClose) {
          setTimeout(() => {
            state.showSlot = false;
          }, +props.duration * 1000);
        }
      };

      const onClick = (e: Event) => {
        emit('click-pop', e);
      };

      const onClickCloseIcon = (e: Event) => {
        e.stopPropagation();
        emit('click-close-icon', e);
        emit('update:visible', false);
        // close();
      };

      const onClickOverlay = (e: Event) => {
        emit('click-overlay', e);
        if (props.closeOnClickOverlay) {
          emit('update:visible', false);
          // close();
        }
      };

      const onOpened = (el: Element) => {
        emit('opened', el);
      };

      const onClosed = (el: Element) => {
        emit('closed', el);
      };

      watch(
        () => props.visible,
        () => {
          props.visible ? open() : close();
        }
      );
      watchEffect(() => {
        // props.visible ? open() : close();
        state.closed = props.closeable;
      });

      return {
        ...toRefs(state),
        popStyle,
        transitionName,
        classes,
        onClick,
        onClickCloseIcon,
        onClickOverlay,
        onOpened,
        onClosed
      };
    }
  };
};
