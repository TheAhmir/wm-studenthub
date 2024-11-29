import pandas as pd
import plotly.express as px

# Sample data
data = {
    'Fruit': ['Apples', 'Oranges', 'Bananas'],
    'Amount': [4, 1, 2]
}

# Create a bar chart
fig = px.bar(data, x='Fruit', y='Amount', color='Fruit', title='Fruit Sales')
fig.show()
