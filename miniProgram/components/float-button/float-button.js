Component({
  data: {
    showOptions: false,
    showPreviewImage: false,
    previewImageSrc: '',
    currentOption: null,
    optionImages: {
      '1': '/icons/code.svg',
      // '2': '/icons/avatar.svg',
      // '3': '/icons/click.svg',
      // '4': '/icons/code.svg'
    }
  },

  lifetimes: {
    attached() {
      this.pageContext = getCurrentPages()[getCurrentPages().length - 1];
      this.pageContext.handleGlobalTap = () => {
        if (this.data.showPreviewImage) {
          this.closePreview();
        }
      };
    },
    detached() {
      if (this.pageContext) {
        this.pageContext.handleGlobalTap = null;
      }
    }
  },

  methods: {
    onLongTap(e) {
      this.setData({ showOptions: true });
    },

    onTouchEnd(e) {
      if (this.data.currentOption) {
        this.showPreviewImage(this.data.currentOption);
      }
      this.setData({ showOptions: false });
    },

    // onTouchMove(e) {
    //   if (this.data.showOptions) {
    //     const touch = e.touches[0];
    //     this.createSelectorQuery()
    //       .selectAll('.option-item')
    //       .boundingClientRect((rects) => {
    //         let foundOption = false;
    //         rects.forEach((rect, index) => {
    //           if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
    //               touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
    //             const option = index + 1;
    //             foundOption = true;
    //             if (this.data.currentOption !== option) {
    //               this.setData({ currentOption: option });
    //               this.showPreviewImage(option);
    //             }
    //           }
    //         });
    //         if (!foundOption) {
    //           this.setData({ 
    //             currentOption: null,
    //             showPreviewImage: false,
    //             previewImageSrc: ''
    //           });
    //         }
    //       })
    //       .exec();
    //   }
    // },
    onTouchMove(e) {
      if (this.data.showOptions) {
        const touch = e.touches[0];
        this.createSelectorQuery()
          .selectAll('.option-item')
          .boundingClientRect((rects) => {
            let foundOption = false;
            rects.forEach((rect, index) => {
              if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                  touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                const option = index + 1;
                foundOption = true;
                if (this.data.currentOption !== option) {
                  this.setData({ currentOption: option });
                  this.showPreviewImage(option);
                }
              }
            });
            if (!foundOption) {
              this.setData({ 
                currentOption: null,
                showPreviewImage: false,
                previewImageSrc: ''
              });
            }
          })
          .exec();
      }
    },

    showPreviewImage(option) {
      const previewImageSrc = this.data.optionImages[option];
      if (previewImageSrc) {
        this.setData({
          previewImageSrc,
          showPreviewImage: true
        });
      }
    },

    closePreview() {
      console.log('Closing preview');
      this.setData({
        showPreviewImage: false,
        previewImageSrc: '',
        showOptions: false,
        currentOption: null
      });
    },

    onPreviewTap(e) {
      e.stopPropagation();
    }
  }
});