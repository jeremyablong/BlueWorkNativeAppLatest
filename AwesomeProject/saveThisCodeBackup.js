 <Button title="Menu" onPress={this.toggleModal} />
		        <Modal isVisible={this.state.isModalVisible}>
		          <View style={styles.menu}>
		            <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.");
		            		console.log("This is the props :", this.props);
		            		this.props.navigation.navigate('home')
		            	}}
				        leftAvatar={null}
				        title="Go To Homepage"
				        subtitle="This will take you back to the homepage"
				        bottomDivider
				    />
				    <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("contact")
		            	}}
				        leftAvatar={null}
				        title="Go To Contact Page"
				        subtitle="This will take you to the contact page"
				        bottomDivider
				      />
				      {firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("main_map")
		            	}}
				        leftAvatar={null}
				        title="Visit our map with all of our job postings!"
				        subtitle="This will take you to the maps section of the avaliable jobs"
				        bottomDivider
				      /> : null}
				      <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("jobs_list")
		            	}}
				        leftAvatar={null} 
				        title="View Our Job Postings!"
				        subtitle="This will take you to the job postings page so you can browse our listings"
				        bottomDivider
				      />
				    {firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("profile")
		            	}}
				        leftAvatar={null}
				        title="Profile"
				        subtitle="This will take you to your profile."
				        bottomDivider
				      /> : null}
				      {firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("messages_home")
		            	}}
				        leftAvatar={null}
				        title="Check out your messages through this link"
				        subtitle="This will take you to your messages homepage."
				        bottomDivider
				      /> : null}
					{firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		this.props.navigation.navigate("signup_business_account")
		            	}}
				        leftAvatar={null}
				        title="Create A Job Posting!"
				        subtitle="This will take you to the job creation page."
				        bottomDivider
				      /> : null}
				    {/*<ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("profile")
		            	}}
				        leftAvatar={null}
				        title="Profile"
				        subtitle="This will take you to your profile."
				        bottomDivider
				      />*/}
					{this.renderContent()}
		            <View style={styles.buttonContainer}>
		            	<Button title="CLOSE THIS MENU" onPress={this.toggleModal} style={styles.bottomBtn}/>
		            </View>
		          </View>
		        </Modal>